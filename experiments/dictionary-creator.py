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


