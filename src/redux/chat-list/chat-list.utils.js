export const modifiyUserSearchRes = (users) => {
  if (users === null) return null;
  const modifiedArr = users.map((e) => (
    <div className="searched-user" data-id={e._id} key={e._id}>
      <img src={e.img} alt={e.name} data-id={e._id} />
      <span data-id={e._id}>{e.name}</span>
    </div>
  ));
  return modifiedArr;
};
