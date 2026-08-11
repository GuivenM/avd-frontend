import { Link } from 'react-router-dom';
import { useLocale, useLocalizedPath } from '../lib/locale';
import { common } from '../i18n/common';

type Props = {
  title: string;
  text: string;
  eyebrow?: string;
};

export default function MembershipCta({ title, text, eyebrow }: Props) {
  const locale = useLocale();
  const t = common[locale];
  const lp = useLocalizedPath();

  return (
    <section className="membership">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <span className="label" style={{ color: '#FFE4D6' }}>{eyebrow ?? t.membershipCta.defaultEyebrow}</span>
        <h2>{title}</h2>
        <p style={{ margin: '0 auto 22px' }}>{text}</p>
        <div className="cta-row" style={{ justifyContent: 'center' }}>
          <Link to={lp('/devenir-membre')} className="btn btn-white">{t.membershipCta.button}</Link>
        </div>
      </div>
    </section>
  );
}
