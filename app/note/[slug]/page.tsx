type Props = {
  params: { slug: string };
};

export default function SlugNote(props: Props) {
  return <div>Note #{props.params.slug}</div>;
}
