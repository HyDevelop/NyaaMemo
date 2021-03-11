import json

if __name__ == '__main__':
    with open('../src/logic/jisho.json', 'r') as f:
        data = json.load(f)

        for v in data['words'].values():
            v['definition'] = [d for d in v['definition'] if not d.startswith('Wikipedia definition |')]

        with open('../src/logic/jisho-filtered.json', 'w') as out:
            json.dump(data, out, ensure_ascii=False, indent=2)
