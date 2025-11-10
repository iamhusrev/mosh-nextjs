interface Props {
  params: Promise<{ id: string }>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  // Server-side log (production'da kaldırabilirsin)
  console.log("UserDetailPage rendered with id:", id);

  return <div>UserDetailPage {id}</div>;
};

export default UserDetailPage;
