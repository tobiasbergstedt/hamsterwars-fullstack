import { useState } from "react"
import { fixUrl } from "../utils"

const Settings = () => {
  const [maybeData, setMaybeData] = useState<string[] | null>(null)

  const getData: (() => Promise<void>) = async () => {
    const response = await fetch(fixUrl('/fruits'))
    const data = await response.json()
    setMaybeData(data)
  }

  return (
    <section className="settings">
      <h1>Settings</h1>
      Settings
      <button onClick={getData}>Get data from API</button>
      <section> {maybeData? maybeData.map(fruit => (<p key={fruit}>{fruit}</p>)) : 'No data yet...'} </section>
      <img src={fixUrl("/img/hamster-14.jpg")} alt="" />
    </section>
  )
}

export default Settings
