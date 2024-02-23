package keeper

import (
	"context"

	"nameservice/x/nameservice/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Name(goCtx context.Context, req *types.QueryNameRequest) (*types.QueryNameResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	whois, found := k.GetWhois(ctx, req.Name)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryNameResponse{Whois: whois}, nil

}
