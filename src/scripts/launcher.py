#!/usr/bin/python3
import os

def main():
    path = os.path.dirname(os.path.abspath(__file__))
    os.chdir(path + "/../")
    os.system("npm start")

main()