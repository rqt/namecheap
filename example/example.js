/* yarn example/ */
import namecheap from '../src'

(async () => {
  const res = await namecheap({
    text: 'example',
  })
  console.log(res)
})()