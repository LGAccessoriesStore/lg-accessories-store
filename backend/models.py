from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
db = SQLAlchemy()

def indian_time():
    return datetime.utcnow() + timedelta(hours=5, minutes=30)
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(200), nullable=False)

    description = db.Column(db.Text)

    price = db.Column(db.Float)

    original_price = db.Column(db.Float, default=0)

    image = db.Column(db.String(500))

    category = db.Column(db.String(100))

    benefits = db.Column(db.Text)

    usage = db.Column(db.Text)

    specifications = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "original_price": self.original_price,
            "image": self.image,
            "category": self.category,
            "benefits": self.benefits,
            "usage": self.usage,
            "specifications": self.specifications
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    customer_name = db.Column(db.String(200), nullable=False)

    mobile = db.Column(db.String(20), nullable=False)

    address = db.Column(db.Text, nullable=False)

    pincode = db.Column(db.String(20), nullable=False)

    product_id = db.Column(db.Integer, nullable=False)

    quantity = db.Column(db.Integer, default=1)

    total_price = db.Column(db.Float, default=0)

    status = db.Column(db.String(50), default="Pending")

    order_date = db.Column(
        db.DateTime,
        default=indian_time
)

    def to_dict(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "mobile": self.mobile,
            "address": self.address,
            "pincode": self.pincode,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "total_price": self.total_price,
            "status": self.status,
            "order_date": self.order_date.strftime("%d-%m-%Y"),
            "order_time": self.order_date.strftime("%I:%M %p")
        }