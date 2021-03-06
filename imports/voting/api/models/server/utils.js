import { onErc20ContractReceiving } from '/imports/ethereum/index';
import { Accounts } from '../../../../accounts';
import { Proposals } from '../proposals';

export const reComputeProposalsUpdatedAt = () =>
  Proposals.find({}).forEach(({ _id, votes, createdAt }) =>
    Proposals.update(_id, {
      $set: {
        updatedAt: Math.max(createdAt, ...Object.values(votes).map(v => v.createdAt)),
      },
    }, { getAutoValues: false }));

onErc20ContractReceiving((erc20contract) => {
  const decimals = erc20contract.decimals().neg();

  const reFetchAccountsBalances = () =>
    Accounts.find({}).forEach(({ _id, balance: oldBalance }) => {
      const balance = +erc20contract.balanceOf(_id).shift(decimals);
      if (balance === oldBalance) return;
      Accounts.update(_id, { $set: { balance } });
    });

  Object.assign(module.exports, { reFetchAccountsBalances });
});

export const reComputeProposalsAmounts = () =>
  Proposals.find({}).forEach(({ _id, votes }) => {
    let upVoteAmount = 0;
    let downVoteAmount = 0;
    Object.keys(votes).forEach((address) => {
      const { balance } = Accounts.findOne(address);
      if (votes[address].upVote) upVoteAmount += balance;
      else downVoteAmount += balance;
    });
    const totalVoteAmount = upVoteAmount + downVoteAmount;
    Proposals.update(_id, {
      $set: {
        upVoteAmount,
        downVoteAmount,
        totalVoteAmount,
        upVoteRatio: upVoteAmount / totalVoteAmount,
      },
    }, { getAutoValues: false });
  });
