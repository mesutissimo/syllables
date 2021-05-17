
const vovels = ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']

const splitWord = (word, index) => {

    let first = ''
    let second = ''
    const splittedLetters = word.split("")
    for (let i = 0; i < splittedLetters.length; i++) {
        if (i <= index - 1) {
            first += splittedLetters[i]
        } else {
            second += splittedLetters[i]
        }
    }

    return [first, second]
}

const speller = (word) => {
    const syllables = []
    const detect = (word) => {

        const arr = word.split("")
        for (let i = arr.length - 1; i >= 0; i--) {
            const letter = arr[i]

            if (vovels.includes(letter)) {
                // vovel found 
                const letterBefore = arr[i - 1]

                if (vovels.includes(letterBefore)) {
                    const [rest, syl] = splitWord(word, i)
                    syllables.push(syl)
                    detect(rest)
                    break
                } else {
                    const [rest, syl] = splitWord(word, i - 1)
                    syllables.push(syl)
                    detect(rest)
                    break
                }
            } else {
                let noVovel = !arr.some(l => vovels.includes(l))
                if (noVovel) {
                    syllables[syllables.length - 1] = word + syllables[syllables.length - 1]
                }
            }
        }
    }
    detect(word)
    return { syllables: syllables.reverse(), count: syllables.length }
}

export default speller
