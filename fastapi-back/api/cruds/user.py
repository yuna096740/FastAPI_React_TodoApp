from passlib.context import CryptContext
from sqlalchemy.orm import Session

from api.models.user import User

pwd_context = CryptContext(schemas=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.User.email == email).first()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(
        db: Session,
        email: str,
        password: str,
        expire: int,
        reuse: bool):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return True


def get_password_hash(password):
    return pwd_context.pwd_context.hash(password)