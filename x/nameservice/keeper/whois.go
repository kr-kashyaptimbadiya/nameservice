package keeper

import (
	"nameservice/x/nameservice/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	base "github.com/cosmos/cosmos-sdk/x/auth/types"
)

func (k Keeper) GetWhois(ctx sdk.Context, name string) (val types.Whois, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NameKey))
	n := store.Get([]byte(name))
	if n == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(n, &val)
	return val, true
}

func (k Keeper) AppendWhois(ctx sdk.Context, whois types.Whois) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NameKey))
	appendVal := k.cdc.MustMarshal(&whois)
	store.Set([]byte(whois.Name), appendVal)
}

func (k Keeper) getaddress() sdk.AccAddress {
	central2, _ := sdk.AccAddressFromBech32(types.DefaultGenesis().Address)
	acc := base.NewBaseAccountWithAddress(central2)
	return acc.GetAddress()
}
