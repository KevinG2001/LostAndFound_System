const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://192.168.0.197:5173",
    "http://192.168.0.197:5174",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

module.exports = corsOptions;
