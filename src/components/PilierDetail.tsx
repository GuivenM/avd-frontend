type Props = {
  index: number;
  title: string;
  items: string[];
};

export default function PilierDetail({ index, title, items }: Props) {
  return (
    <article className="pilier-detail">
      <div className="num">{String(index).padStart(2, '0')}</div>
      <div>
        <h2>{title}</h2>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
