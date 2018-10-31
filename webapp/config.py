import os

class Config:
    SECRET_KEY = os.urandom(24)
    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site1.db'
    DEBUG = True

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site1.db'
    DEBUG = True

config = {
    'development' : DevelopmentConfig,
    'production' : ProductionConfig,
    'default': DevelopmentConfig
}
