"reach 0.1";

const Params = Object({ nftId: Token, price: UInt });
const amt = 1;

export const main = Reach.App(() => {
  const Creator = Participant("Creator", {
    getSale: Fun([], Params),
  });
  const Buyer = Participant("Buyer", {
    seeParams: Fun([Params], Null),
  });
  init();

  Creator.only(() => {
    const { nftId, price } = declassify(interact.getSale());
  });
  Creator.publish(nftId, price);
  commit();

  Creator.pay([[amt, nftId]]);
  commit();

  Buyer.interact.seeParams({ nftId, price });
  Buyer.publish().pay(price);
  transfer(price).to(Creator);
  transfer(amt, nftId).to(Buyer);
  commit();

  exit();
});