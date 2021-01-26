from flask import Flask, render_template
import numpy as np, pandas as pd
from random import randint

csvEasy = pd.read_csv('easy.csv',usecols=['puzzle', 'solution'])
csvMed = pd.read_csv('medium.csv',usecols=['puzzle',    'solution'])
csvHard = pd.read_csv('hard.csv',usecols=['puzzle',    'solution'])

#print(csvEasy.loc[randint(0,99),'puzzle'])

def getPuzzle():
    index = randint(0,99)
    sudoku = {'easy_puzzle':csvEasy.loc[index,'puzzle'], 'easy_solution':csvEasy.loc[index,'solution'], 'medium_puzzle':csvMed.loc[index,'puzzle'], 'medium_solution':csvMed.loc[index,'solution'], 'hard_puzzle':csvHard.loc[index,'puzzle'], 'hard_solution':csvHard.loc[index,'solution']}
    return sudoku

app = Flask(__name__)

@app.route("/")
def hello():
    sudoku=getPuzzle()
    return render_template("index.html",sudoku=sudoku)

