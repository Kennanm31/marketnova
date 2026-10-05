from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import content, sentiment, segmentation, campaigns

app = FastAPI(title="MarketNova API")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(content.router, prefix="/api/content", tags=["Content Generation"])
app.include_router(sentiment.router, prefix="/api/sentiment", tags=["Sentiment Analysis"])
app.include_router(segmentation.router, prefix="/api/segmentation", tags=["Customer Segmentation"])
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["Campaign Prediction"])

@app.get("/")
def root():
    return {"message": "MarketNova API is running. Check /docs for documentation."}
