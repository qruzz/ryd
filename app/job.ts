#!/usr/bin/env node
import { createApp } from "./create";

createApp(process.argv.slice(2))();
