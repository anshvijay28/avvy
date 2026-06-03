from fastapi import Header, HTTPException

# TODO: load from env and verify with python-jose


def verify_jwt(authorization: str = Header(...)) -> str:
    """Verify Supabase JWT and return user_id. Not implemented."""
    raise HTTPException(status_code=501, detail="JWT verification not implemented")
