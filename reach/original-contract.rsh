"reach 0.1";

const Params = Object({ nftId: Token, price: UInt });

export const main = Reach.App(() => {
  const Creator = Participant("Creator", {
    getSale: Fun([], Params),
  });
  const Buyer = ParticipantClass("Buyer", {
    seeParams: Fun([Params], Null),
  });
  init();

  Creator.only(() => {
    const { nftId, price } = declassify(interact.getSale());
  });
  Creator.publish(nftId, price);
  const amt = 1;
  commit();

  Buyer.publish().pay(price);
  commit();
  Creator.only(() => {
    const creatorAddr = this;
  });
  Creator.publish(creatorAddr);
  transfer(price).to(creatorAddr);
  commit();

  Buyer.interact.seeParams({ nftId, price });

  Creator.pay([[amt, nftId]]);
  commit();
  Buyer.only(() => {
    const BuyerAddr = this;
  });
  Buyer.publish(BuyerAddr);
  transfer(amt, nftId).to(BuyerAddr);
  commit();

  exit();
});
