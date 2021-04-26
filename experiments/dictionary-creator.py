import re
from datetime import datetime
from typing import List, Dict
from pathlib import Path

# Readline enables line editing features (https://stackoverflow.com/a/45772524/7346633)
import readline

# pip3 install json5, pykakasi
import json5
import pykakasi


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
    kks = pykakasi.kakasi()
    date = datetime.now().strftime('%Y-%m-%d')

    # Input paths
    book = ''
    output = ''

    # Read last input paths
    with openRW('.dic-creator.last-config') as lastCfgFile:
        last = json5.loads(readJsonStr(lastCfgFile))
        if 'date' in last:
            book = last['bookPath']
            output = last['outputPath']

        # Book path
        bookInput = input('Input book path' + (': ' if book == '' else ' (enter for {})'.format(book)))
        outputInput = input('Input dictionary path' + (': ' if output == '' else ' (enter for {})'.format(output)))
        book = book if bookInput == '' else bookInput
        output = output if outputInput == '' else outputInput

        # Save last path
        last['date'] = date
        last['bookPath'] = book
        last['outputPath'] = output
        override(lastCfgFile, last)

    # Open file
    with open(book) as bookFile, openRW(output) as outFile:
        # Read existing json
        book = json5.load(bookFile)
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
            # Generate automatic hiragana, and take input for verification
            auto = ''.join([item['hira'] for item in kks.convert(word)])
            hiragana = input('Please input Hiragana for {} (or enter for {}): '.format(word, auto))
            if hiragana == '':
                hiragana = auto

            words[word] = {'word': [word, hiragana], 'definition': [], 'sentences': []}
            wordsWithoutDefinitions.append(word)
            wordsWithoutSentences.append(word)
            save()
        missingWords.clear()

        # Prompt to input words without definitions
        for word in wordsWithoutDefinitions:

            # Prompt to input definitions for one word
            print()
            print('Inputting definition for {} (enter to move on to the next word):'.format(word))
            while True:
                definition = input('> ')

                # Finish inputting this word
                if definition == '':
                    save()
                    break

                # Undo command
                if definition == 'undo':
                    print('Definition removed:', words[word]['definition'].pop())
                    continue

                # Add one definition
                definition = definition.strip()
                if re.match('[a-zA-Z]+\\. .*', definition):
                    words[word]['definition'].append(definition)
                    print('Definition added:', definition)
                else:
                    print('Wrong format. Please input definition in the "<word form>. <definition>" format. (For example, n. dog)')

        # Done, save
        save()


