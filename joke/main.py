from flask import Blueprint, render_template, jsonify, redirect, url_for

joke_blueprint = Blueprint('JokeBlueprint', __name__, url_prefix='/jokes')
