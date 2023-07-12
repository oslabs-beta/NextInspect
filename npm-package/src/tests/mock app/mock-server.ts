import app from '../../tests/mock app/mock-app'

const PORT: number = 3002
// connect to express port
app.listen(PORT, (): void => {
  console.log('NextInspect express npm package running on on port:' + PORT)
})
