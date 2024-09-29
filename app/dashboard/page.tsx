import Navbar from '../ui/Navbar';
import Balance from "../ui/balance"

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <section>
        <Balance balance={15}/>
      </section>
    </>
  )
}
