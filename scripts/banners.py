import csv
import os

# Script for scraping data from Upcoming Banners by Servant
# Just delete the image column then save a csv with the filename [class].txt

servantClasses = os.listdir('.')
servantObject = open('./servantObject.txt', "a")
for servantClass in servantClasses:
  with open(servantClass) as servantClassBannerCsv:
    servantData = csv.reader(servantClassBannerCsv)
    for row in servantData:
      if(len(row) > 1 and row[1] != 'Servant'):
        rowCopy = [i for i in row if i]
        if(len(rowCopy) > 4):
          servantString = "\"" + row[1] + "\": ["
          rowCopy = rowCopy[2:]
          while len(rowCopy) > 4:
            servantString = servantString + "[\""+ rowCopy[0] + "\",\"" + rowCopy[4] + "\"],"
            rowCopy = rowCopy[5:]
          servantString = servantString[:-1]
          servantString = servantString + "],\n"
          servantObject.write(servantString)
servantObject.close()