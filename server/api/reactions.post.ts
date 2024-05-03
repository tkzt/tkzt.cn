export default defineEventHandler(async (event) => {
  const dataStorage = useStorage('data');
  const { reaction, action, reactor } = await readBody(event)

  const reactions = await dataStorage.getItem<string[]>(reaction) || []
  if (action && reactor) {
    if (action === 'add' && !reactions.includes(reactor)) {
      reactions.push(reactor)
    } else if (action === 'remove' && reaction.includes(reactor)) {
      reactions.splice(reactions.indexOf(reactor), 1)
    }
    await dataStorage.setItem(reaction, reactions);
  }
  return { reactions }
})
