module.exports = {
  apps: [{
    name: "smtp",
    script: "dist/app.js",
    watch: true,
    instances: 2,
    exec_mode: "cluster",
    env: {
      "NODE_ENV": "development"
    },
    env_production: {
      "NODE_ENV": "production"
    },
    out_file: "./logs/pm2-smtp-out.log",
    error_file: "./logs/pm2-smtp-error.log",
    log_date_format: "YYYY-MM-DD HH:mm",
    kill_timeout: 1600,
    max_restarts: 10
  }]
}
