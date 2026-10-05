import asyncio
from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class CampaignRequest(BaseModel):
    budget: float
    platform: str
    duration_days: int
    target_audience: str

class CampaignResponse(BaseModel):
    predicted_reach: int
    predicted_conversion_rate: float
    estimated_roi: float
    recommendation: str
    daily_forecast: list[dict]

@router.post("/predict", response_model=CampaignResponse)
async def predict_campaign(req: CampaignRequest):
    await asyncio.sleep(1.2)
    
    base_reach = int(req.budget * 1.5)
    conversion = 2.5
    
    if req.platform.lower() == "instagram":
        base_reach = int(base_reach * 1.2)
        conversion = 3.1
    elif req.platform.lower() == "linkedin":
        base_reach = int(base_reach * 0.8)
        conversion = 4.5
        
    roi = (req.budget * (conversion / 100) * 50) - req.budget
    roi_percentage = (roi / req.budget) * 100 if req.budget > 0 else 0
    
    if roi_percentage > 20:
        rec = "Strong campaign setup. Proceed with launch."
    else:
        rec = "Low predicted ROI. Consider adjusting targeting or increasing budget for better reach."
        
    # Generate mock daily forecast for chart
    daily_forecast = []
    current_reach = 0
    for day in range(1, req.duration_days + 1):
        daily_gain = int((base_reach / req.duration_days) * random.uniform(0.8, 1.2))
        current_reach += daily_gain
        daily_forecast.append({"day": f"Day {day}", "reach": current_reach})
        
    return CampaignResponse(
        predicted_reach=base_reach,
        predicted_conversion_rate=round(conversion, 2),
        estimated_roi=round(roi_percentage, 2),
        recommendation=rec,
        daily_forecast=daily_forecast
    )
