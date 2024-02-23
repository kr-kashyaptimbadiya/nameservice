package keeper

import (
	"context"

	"nameservice/x/nameservice/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Minbidprice(goCtx context.Context, req *types.QueryMinbidpriceRequest) (*types.QueryMinbidpriceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	whowner, isFound := k.GetWhois(ctx, req.Name)

	if !isFound {

		return &types.QueryMinbidpriceResponse{Name: req.Name, Minbidprice: "10token"}, nil
	}

	return &types.QueryMinbidpriceResponse{Name: whowner.Name, Minbidprice: whowner.Minbid}, nil
}
