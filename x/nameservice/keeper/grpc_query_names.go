package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"nameservice/x/nameservice/types"
)

func (k Keeper) Names(goCtx context.Context, req *types.QueryNamesRequest) (*types.QueryNamesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	var whoises []types.Whois

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NameKey))

	//calls the Paginate function from the query package on the store and the pagination information in the request object.
	//The function passed as an argument to Paginate iterates over the key-value pairs in the store and unmarshals
	//the values into Post objects, which are then appended to the posts slice.
	pageRes, err := query.Paginate(store, req.Pagination, func(key []byte, value []byte) error {
		var whois types.Whois
		if err := k.cdc.Unmarshal(value, &whois); err != nil {
			return err
		}

		whoises = append(whoises, whois)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryNamesResponse{Whois: whoises, Pagination: pageRes}, nil
}

