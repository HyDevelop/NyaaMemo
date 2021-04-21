import textwrap
from datetime import datetime
from typing import List, Dict

import json5


def allWords(chap) -> List[str]:
    res = []
    if chap["subchapters"]:
        for sub in chap["subchapters"]:
            res += allWords(sub)


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

            print('Checking dictionary info...')
            for key in ['name', 'description', 'author', 'license', 'worldLanguage', 'definitionLanguage']:
                if key not in out:
                    out[key] = input('> Dictionary {}: '.format(key))
            print('Dictionary info checked.')
            print()

            # Create word list if not exist
            if 'words' not in out:
                out['words'] = {}
            words: Dict[str, Dict] = out['words']

            # Missing words

            # Done, save
            json5.dump(out, outFile, indent=2)


