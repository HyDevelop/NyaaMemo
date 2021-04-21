from datetime import datetime
from typing import List, Dict

import json5


def getAllWords(chap) -> List[str]:
    res = []
    if 'subchapters' in chap:
        for sub in chap["subchapters"]:
            res += getAllWords(sub)
    if 'words' in chap:
        res += chap["words"]
    return res


if __name__ == '__main__':
    # Input paths
    book = input('Input book path: ')
    output = input('Input output file name: ') + '.json5'

    date = datetime.now().strftime('"%Y-%m-%d')

    # Open file
    with open(book) as bookFile:
        book = json5.load(bookFile)

        with open(output, 'r+') as outFile:
            # Read existing json
            temp = outFile.read()
            if temp.strip() == '':
                temp = '{}'
            out = json5.loads(temp)

            # Save function
            def save():
                outFile.seek(0)
                outFile.write(json5.dumps(out, indent=2, ensure_ascii=False))
                outFile.truncate()

            # Make sure that all meta info keys exist
            print('Checking dictionary info...')
            for key in ['name', 'description', 'author', 'license', 'worldLanguage', 'definitionLanguage']:
                if key not in out:
                    out[key] = input('> Dictionary {}: '.format(key))
            print('Dictionary info checked.')
            print()

            # Create word list if not exist
            if 'words' not in out:
                out['words'] = {}
            words: Dict[str, Dict[str, List]] = out['words']

            # Missing words
            allWords = [getAllWords(chap) for chap in book['chapters']]
            allWords = [item for ls in allWords for item in ls]
            missingWords = [word for word in allWords if word not in out]
            print(missingWords)

            # Done, save
            outFile.truncate(0)
            json5.dump(out, outFile, indent=2)


