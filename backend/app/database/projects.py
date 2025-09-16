from datetime import datetime
from pydantic import BaseModel 

class projects(BaseModel):
    title: str
    description: str
    languages: str
    demo: str
    code:str
    photo:id
    creation:int=int(datetime.timestamp(datetime.now()))
    updated_at:int=int(datetime.timestamp(datetime.now()))

