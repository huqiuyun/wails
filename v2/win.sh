#!/bin/bash

GOOS=windows GOARCH=amd64 go build -tags "windows" -o wails.exe github.com/wailsapp/wails/v2/cmd/wails