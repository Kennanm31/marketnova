import asyncio
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class ContentRequest(BaseModel):
    product_name: str
    target_audience: str
    key_benefits: str
    tone: str
    language: Optional[str] = "English"

class ContentResponse(BaseModel):
    ad_copy: str
    suggestions: list[str]
    detected_keywords: list[str]

@router.post("/generate", response_model=ContentResponse)
async def generate_content(req: ContentRequest):
    await asyncio.sleep(1.8)
    
    tone_formatted = req.tone.lower()
    
    greetings = {"English": "Introducing", "Spanish": "Presentamos", "French": "Découvrez", "German": "Wir stellen vor"}
    greeting = greetings.get(req.language, "Introducing")
    
    ad_copy = (
        f"{greeting} {req.product_name} - the ultimate solution for {req.target_audience}. "
        f"Experience the power of {req.key_benefits}. "
        f"Don't wait, upgrade your lifestyle today!"
    )
    
    if req.language == "English":
        if tone_formatted == "professional":
            ad_copy = (
                f"Elevate your workflow with {req.product_name}. Designed explicitly for {req.target_audience}, "
                f"it delivers unparalleled {req.key_benefits}. Discover efficiency redefined."
            )
        elif tone_formatted == "playful":
            ad_copy = (
                f"Say hello to {req.product_name}! The fun and easy way for {req.target_audience} to "
                f"enjoy {req.key_benefits}. Grab yours now and join the party!"
            )
        
    return ContentResponse(
        ad_copy=ad_copy,
        suggestions=[
            f"Run an A/B test emphasizing: {req.key_benefits.split(',')[0] if ',' in req.key_benefits else req.key_benefits}",
            f"Optimize for {req.language} regional search trends.",
            "Integrate a clear CTA like 'Start Free Trial'."
        ],
        detected_keywords=[req.product_name, req.target_audience.split()[0], "efficiency"]
    )
