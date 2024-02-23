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

	central, _ := sdk.AccAddressFromBech32("cosmos1h7ce483sxcwms77je0pxv3un5ydcgs4jy6ndla")

	if isFound {
		if price.Add(sdk.NewInt64Coin("token", 10)).IsAllGT(bid) {
			return nil, sdkerrors.Wrap(sdkerrors.ErrInsufficientFunds, "Bid is not high enough, minimum transfer fee is ")
		}
		err := k.bankKeeper.SendCoins(ctx, buyer, central, bid.Add(sdk.NewInt64Coin("token", 5)))
		if err != nil {
			return nil, err
		}
		err1 := k.bankKeeper.SendCoins(ctx, central, owner, bid.Add(price...))
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
		Name:  msg.Name,
		Price: bid.String(),
		Owner: buyer.String(),
	}

	k.AppendWhois(ctx, newWhois)
	return &types.MsgBuynameResponse{}, nil
}
