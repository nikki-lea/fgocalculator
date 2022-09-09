import csv
import os

# Script for scraping data from FGO Event Compendium for SQ rewards
# Files must have the name 20**.csv
# Columns are [monthNumber], [sqCount], [ticketCount] and those are the only columns
# Each row needs its own [monthNumber], [sqCount], [ticketCount] so you may need to unmerge cells and duplicate month #s
# There should be no header/footer rows

def sqHelper(row):
  # if event has tickets or sq
  if(row[1] or row[2]):
    # if event has both tickets and sq
    if (row[1] and row[2]):
      return 3*int(row[2])
      totalsq = totalsq + sq
    # if event only has sq
    elif (row[1]):
      return int(row[1])
    # if event only has tickets
    elif (row[2]):
      return 3*int(row[2])
  else:
    return 0

def main():
  years = os.listdir('.')
  events = open('./events.txt', "a")
  for year in years:
    with open(year) as yearCsv:
      if  (year.startswith("20")):
        yearData = csv.reader(yearCsv)
        currentMonth = "01"
        currentEvent = '\"' + year[:-4] + "-" + currentMonth + "\": "
        totalsq = 0
        for row in yearData:
          if (row[0] == currentMonth):
            totalsq = totalsq + sqHelper(row)
          else:
            currentEvent = currentEvent + str(totalsq) + ",\n"
            events.write(currentEvent)
            currentMonth = row[0]
            currentEvent = '\"' + year[:-4] + "-" + row[0] + "\": "
            totalsq = sqHelper(row)
        currentEvent = currentEvent + str(totalsq) + ",\n"
        events.write(currentEvent)
  events.close()

if __name__ == "__main__":
    main()