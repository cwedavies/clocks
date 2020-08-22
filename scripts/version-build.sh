#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

cat << EOF
{
  "commit": "${GITHUB_SHA:-$(git rev-parse HEAD)}",
  "buildDate": "$(date  -u +%FT%TZ)",
  "ref": "${GITHUB_REF:-$(git rev-parse --abbrev-ref HEAD)}",
  "runId": "${GITHUB_RUN_ID:-}",
  "runNumber": "${GITHUB_RUN_NUMBER:-}"
}
EOF
