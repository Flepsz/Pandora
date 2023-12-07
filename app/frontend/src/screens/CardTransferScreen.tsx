import CardTransaction from "../components/Card/CardTransaction";

export default function CardTransferScreen({route}) {
  return (
    <CardTransaction cardNumber={route.params} />
  )
}
