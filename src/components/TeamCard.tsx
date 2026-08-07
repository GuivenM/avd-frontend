type TeamCardProps = {
  fonction: string;
  name: string;
  profession: string;
};

export default function TeamCard({ fonction, name, profession }: TeamCardProps) {
  return (
    <div className="team-card">
      <div className="photo" />
      <div className="info">
        <div className="fn">{fonction}</div>
        <h3>{name}</h3>
        <div className="prof">{profession}</div>
      </div>
    </div>
  );
}
