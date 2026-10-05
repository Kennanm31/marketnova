import asyncio
from fastapi import APIRouter

router = APIRouter()

@router.get("/clusters")
async def get_clusters():
    await asyncio.sleep(0.8)
    
    # Mocking K-Means cluster data + Churn Risk (Future Scope #3)
    clusters = [
        {
            "id": "Cluster 0",
            "name": "High-Value Loyalists",
            "size": 450,
            "characteristics": ["High engagement", "Frequent purchases", "High LTV"],
            "suggested_action": "Enroll in VIP rewards program.",
            "churn_probability": 0.05,
            "plot_points": [{"x": 80 + i, "y": 70 + i} for i in range(5)]
        },
        {
            "id": "Cluster 1",
            "name": "Price-Sensitive Shoppers",
            "size": 1200,
            "characteristics": ["High cart abandonment", "Discount driven", "Seasonal"],
            "suggested_action": "Send targeted discount codes and flash sale alerts.",
            "churn_probability": 0.35,
            "plot_points": [{"x": 40 + i, "y": 50 - i} for i in range(5)]
        },
        {
            "id": "Cluster 2",
            "name": "Dormant Users",
            "size": 300,
            "characteristics": ["Low engagement", "No purchases in 90 days", "Unresponsive"],
            "suggested_action": "Launch re-engagement email campaign.",
            "churn_probability": 0.82,
            "plot_points": [{"x": 10 + i, "y": 20 + i} for i in range(5)]
        }
    ]
    
    return {"clusters": clusters}
