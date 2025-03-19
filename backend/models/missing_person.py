from config.database import db

class MissingPerson(db.Model):
    __tablename__ = 'missing_persons'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date_of_disappearance = db.Column(db.Date, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    last_seen_location = db.Column(db.String(255), nullable=False)
    home_address = db.Column(db.String(255))
    places_frequently_visited = db.Column(db.Text)
    physical_description = db.Column(db.Text)
    clothing_when_last_seen = db.Column(db.Text)
    additional_notes = db.Column(db.Text)
    issuer_mobile_number = db.Column(db.String(20), nullable=False)
    issuer_email_address = db.Column(db.String(100), nullable=False)
    issuer_name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=True)
    images = db.Column(db.LargeBinary)

    def to_dict(self):
        return {
            column.name: getattr(self, column.name) if column.name != 'images' else None
            for column in self.__table__.columns
        }