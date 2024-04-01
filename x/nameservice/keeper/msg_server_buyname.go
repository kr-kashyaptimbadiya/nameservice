package keeper

import (
	"context"

	"nameservice/x/nameservice/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) Buyname(goCtx context.Context, msg *types.MsgBuyname) (*types.MsgBuynameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	whowner, isFound := k.GetWhois(ctx, msg.Name)

	minPrice := sdk.Coins{sdk.NewInt64Coin("token", 10)}

	price, _ := sdk.ParseCoinsNormalized(whowner.Price)
	bid, _ := sdk.ParseCoinsNormalized(msg.Bid)

	buyer, _ := sdk.AccAddressFromBech32(msg.Creator)
	owner, _ := sdk.AccAddressFromBech32(whowner.Owner)

	//genstate := types.DefaultGenesis()
	//central, _ := sdk.AccAddressFromBech32(genstate.Address)

	central := k.getaddress()

	if isFound {
		if price.Add(sdk.NewInt64Coin("token", 10)).IsAllGT(bid) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInsufficientFunds, "Bid is not high enough, minimum bid price is "+whowner.Minbid)
		}
		err := k.bankKeeper.SendCoins(ctx, buyer, central, bid.Add(sdk.NewInt64Coin("token", 5)))
		if err != nil {
			return nil, err
		}
		err1 := k.bankKeeper.SendCoins(ctx, central, owner, bid)
		if err1 != nil {
			return nil, err1
		}
	} else {
		if minPrice.IsAllGT(bid) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInsufficientFunds, "Bid is less than min amount 10token")
		}
		err := k.bankKeeper.SendCoins(ctx, buyer, central, bid.Add(sdk.NewInt64Coin("token", 5)))
		if err != nil {
			return nil, err
		}
	}
	newWhois := types.Whois{
		Name:   msg.Name,
		Price:  bid.String(),
		Owner:  buyer.String(),
		Minbid: bid.Add(sdk.NewInt64Coin("token", 10)).String() + " + you have 5 more token for transection fees",
	}

	k.AppendWhois(ctx, newWhois)
	return &types.MsgBuynameResponse{}, nil
}
