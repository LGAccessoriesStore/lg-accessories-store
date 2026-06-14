from flask import Flask, request, jsonify
from flask_cors import CORS

from models import db, Product, Order

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

    if Product.query.count() == 0:

        products = [

            Product(
                name="Washing Machine Liquid Descaler",
                description="Removes scale and dirt from washing machines",
                price=299,
                image="",
                category="Washing Machine",
                benefits="Improves cleaning performance",
                usage="Use once every month",
                specifications="200ml Bottle"
            ),

            Product(
                name="Refrigerator Water Filter",
                description="High quality water filtration",
                price=1499,
                image="",
                category="Refrigerator",
                benefits="Clean drinking water",
                usage="Replace every 6 months",
                specifications="LG Compatible"
            ),

            Product(
                name="Washing Machine Cover",
                description="Dust proof waterproof cover",
                price=599,
                image="",
                category="Washing Machine",
                benefits="Protects machine",
                usage="Cover machine after use",
                specifications="Universal Fit"
            ),

            Product(
                name="Washing Machine Stand",
                description="Heavy duty stand",
                price=899,
                image="",
                category="Washing Machine",
                benefits="Reduces vibration",
                usage="Place machine on stand",
                specifications="Steel Body"
            ),

            Product(
                name="Refrigerator Stand",
                description="Strong refrigerator base stand",
                price=999,
                image="",
                category="Refrigerator",
                benefits="Improves stability",
                usage="Place refrigerator on stand",
                specifications="Adjustable Size"
            ),

            Product(
                name="AC Cleaning Kit",
                description="DIY air conditioner cleaning kit",
                price=699,
                image="",
                category="Air Conditioner",
                benefits="Improves cooling",
                usage="Clean AC filters",
                specifications="Complete Kit"
            )
        ]

        db.session.add_all(products)
        db.session.commit()


@app.route("/")
def home():
    return "LG Accessories Store Backend Running"


@app.route("/api/products")
def get_products():

    products = Product.query.all()

    return [p.to_dict() for p in products]


# CREATE ORDER API
@app.route("/api/orders", methods=["POST"])
def create_order():

    data = request.json

    new_order = Order(
        customer_name=data["customer_name"],
        mobile=data["mobile"],
        address=data["address"],
        pincode=data["pincode"],
        product_id=data["product_id"],
        quantity=data["quantity"],
        total_price=data["total_price"]
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({
        "message": "Order placed successfully",
        "order_id": new_order.id
    })


# GET ALL ORDERS API
@app.route("/api/orders")
def get_orders():

    orders = Order.query.order_by(Order.id.desc()).all()

    return [order.to_dict() for order in orders]


if __name__ == "__main__":

    with app.app_context():

        product1 = Product.query.get(1)
        if product1:
            product1.name = "LG Washing Machine Power Descaler"
            product1.description = "Removes tough scale, detergent residue and bad odor from washing machines"
            product1.price = 799
            product1.benefits = "Deep cleaning and scale removal"
            product1.usage = "Use once every month"
            product1.specifications = "500g Pack"

        product2 = Product.query.get(2)
        if product2:
            product2.name = "LG GentlCare Liquid Detergent"
            product2.description = "Deep cleaning liquid detergent for clothes with long-lasting freshness"
            product2.price = 299
            product2.category = "Washing Machine"
            product2.benefits = "Removes stains and keeps clothes fresh"
            product2.usage = "Use with every wash"
            product2.specifications = "1L Bottle"

        product3 = Product.query.get(3)
        if product3:
            product3.name = "LG Washing Machine Stand"
            product3.description = "Heavy duty anti-vibration washing machine stand"
            product3.price = 1399
            product3.category = "Washing Machine"
            product3.benefits = "Reduces vibration and protects floor"
            product3.usage = "Place washing machine on stand"
            product3.specifications = "Heavy Duty Steel Stand"

        product4 = Product.query.get(4)
        if product4:
            product4.name = "LG Top Load Washing Machine Magic Filter"
            product4.description = "Original LG lint filter for top load washing machines"
            product4.price = 499
            product4.category = "Washing Machine"
            product4.benefits = "Collects lint and improves washing performance"
            product4.usage = "Replace damaged lint filter"
            product4.specifications = "Original LG Magic Filter"

        product5 = Product.query.get(5)
        if product5:
            product5.name = "LG Front Load Washing Machine Cover"
            product5.description = "Premium waterproof and dustproof cover for front load washing machines"
            product5.price = 699
            product5.category = "Washing Machine"
            product5.benefits = "Protects from dust, moisture and scratches"
            product5.usage = "Cover washing machine when not in use"
            product5.specifications = "Front Load Model Compatible"

        product6 = Product.query.get(6)
        if product6:
            product6.name = "LG Top Load Washing Machine Cover"
            product6.description = "Premium waterproof and dustproof cover for top load washing machines"
            product6.price = 659
            product6.category = "Washing Machine"
            product6.benefits = "Protects from dust, moisture and scratches"
            product6.usage = "Cover washing machine when not in use"
            product6.specifications = "Top Load Model Compatible"

        db.session.commit()

        print("Products Updated Successfully")

    app.run(debug=True)