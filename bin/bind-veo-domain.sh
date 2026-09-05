#!/usr/bin/env bash
# Bind veopromptgenerator.com to the veo-prompt-generator Pages project.
# Prerequisite: the domain has been REGISTERED (RDAP must not return 404).
# Usage: bash bin/bind-veo-domain.sh
set -euo pipefail
ROOT="/Users/weldon/Documents/ai-code/ShipSolo"
set -a; source "$ROOT/.secrets/global.env"; set +a
ACC="$CLOUDFLARE_ACCOUNT_ID"; TOK="$CLOUDFLARE_API_TOKEN"; DOMAIN="veopromptgenerator.com"; PROJ="veo-prompt-generator"
api() { curl -s -H "Authorization: Bearer $TOK" -H "Content-Type: application/json" "$@"; }

echo "== 1. RDAP check (must be registered)"
code=$(curl -s -o /dev/null -w "%{http_code}" "https://rdap.verisign.com/com/v1/domain/$DOMAIN")
[ "$code" = "200" ] || { echo "NOT REGISTERED YET (RDAP $code). Complete the purchase first."; exit 1; }

echo "== 2. Zone"
zid=$(api "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" | python3 -c "import json,sys; r=json.load(sys.stdin)['result']; print(r[0]['id'] if r else '')")
if [ -z "$zid" ]; then
  zid=$(api -X POST "https://api.cloudflare.com/client/v4/zones" -d "{\"name\":\"$DOMAIN\",\"account\":{\"id\":\"$ACC\"},\"type\":\"full\"}" \
    | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['result']['id'] if d['success'] else ''); json.dumps(d['errors']) if not d['success'] else None")
  [ -n "$zid" ] || { echo "zone creation failed"; exit 1; }
  echo "zone created: $zid"
else echo "zone exists: $zid"; fi

echo "== 3. Pages custom domain"
res=$(api -X POST "https://api.cloudflare.com/client/v4/accounts/$ACC/pages/projects/$PROJ/domains" -d "{\"name\":\"$DOMAIN\"}")
echo "$res" | python3 -c "import json,sys; d=json.load(sys.stdin); print('domain add:', 'ok' if d['success'] else d['errors'])"
api -X POST "https://api.cloudflare.com/client/v4/accounts/$ACC/pages/projects/$PROJ/domains" -d "{\"name\":\"www.$DOMAIN\"}" >/dev/null 2>&1 || true

echo "== 4. Wait for activation (zone NS + edge cert, up to 5 min)"
for i in $(seq 1 30); do
  st=$(api "https://api.cloudflare.com/client/v4/accounts/$ACC/pages/projects/$PROJ/domains/$DOMAIN" \
    | python3 -c "import json,sys; r=json.load(sys.stdin)['result']; print(r.get('status',''), r.get('validation_data',{}).get('status',''))" 2>/dev/null || echo "?")
  https=$(curl -s -o /dev/null -w "%{http_code}" -m 10 "https://$DOMAIN/" || echo 000)
  echo "  [$i] status=$st https=$https"
  [ "$https" = "200" ] && break
  sleep 10
done

echo "== 5. Route verification on https://$DOMAIN"
for p in "/" "/veo-3-1-prompt-generator" "/veo-3-prompt-examples" "/veo-3-prompt-guide" "/about" "/privacy" "/terms" "/robots.txt" "/sitemap.xml"; do
  c=$(curl -s -o /dev/null -w "%{http_code}" -m 10 "https://$DOMAIN$p"); echo "$c $p"
done
echo "done. GSC submit: https://search.google.com/search-console?resource_id=sc-domain:$DOMAIN"
