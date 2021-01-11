#!/bin/bash

BASE_DIR="$(cd "$(dirname "$0")"; pwd -P)/.."

pip freeze > "$BASE_DIR/backend/requirements.txt"
