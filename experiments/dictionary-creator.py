from datetime import datetime
from typing import List, Dict
from pathlib import Path

import json5


# Get all words from a book
def getAllWords(chap) -> List[str]:
    res = []
    if 'subchapters' in chap:
        for sub in chap["subchapters"]:
            res += getAllWords(sub)
    if 'words' in chap:
        res += chap["words"]
    return res


# Read json string from a file so that empty files would return {}
def readJsonStr(file) -> str:
    file.seek(0)
    content = file.read()
    return '{}' if content.strip() == '' else content


# Override a file opened in r+ mode
def override(file, jsonObj):
    file.seek(0)
    file.write(json5.dumps(jsonObj, indent=2, ensure_ascii=False))
    file.truncate()


# Open a file, and create one if it doesn't exist. (a+ wouldn't work)
def openRW(path: str):
    # Create if not exist
    Path(path).touch(exist_ok=True)
    return open(path, 'r+')


if __name__ == '__main__':
    # Input paths
    book = input('Input book path: ')
    output = input('Input dictionary path: ')

    date = datetime.now().strftime('"%Y-%m-%d')

    # Open file
    with open(book) as bookFile:
        book = json5.load(bookFile)

        with open(output, 'r+') as outFile:
            # Read existing json
            out = json5.loads(readJsonStr(outFile))

            # Save function
            def save():
                override(outFile, out)

            # Make sure that all meta info keys exist
            print('Checking dictionary info...')
            for key in ['name', 'description', 'author', 'license', 'wordLanguage', 'definitionLanguage']:
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
            missingWords = [word for word in allWords if word not in words and word != '']
            wordsWithoutDefinitions = [w for w in allWords if w in words and ('definition' not in words[w] or words[w]['definition'] == [])]
            wordsWithoutSentences = [w for w in allWords if w in words and ('sentences' not in words[w] or words[w]['sentences'] == [])]

            # TODO: Command/Function system

            # Prompt to input missing words
            for word in missingWords:
                hiragana = input('Please input Hiragana for {}: '.format(word))
                words[word] = {'word': [word, hiragana], 'definition': [], 'sentences': []}
                wordsWithoutDefinitions.append(word)
                wordsWithoutSentences.append(word)
                save()
            missingWords.clear()

            # Prompt to input words without definitions
            for word in wordsWithoutDefinitions:
                while True:
                    definition = input('Please input the definition of {} (type a single space to move on): '.format(word))
                    if definition == ' ':
                        break
                    if definition.strip() != '':
                        words[word]['definition'].append(definition)
                        print('Definition added: ', definition)

            # Done, save
            save()


