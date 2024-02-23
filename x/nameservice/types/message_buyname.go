package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgBuyname = "buyname"

var _ sdk.Msg = &MsgBuyname{}

func NewMsgBuyname(creator string, name string, bid string) *MsgBuyname {
	return &MsgBuyname{
		Creator: creator,
		Name:    name,
		Bid:     bid,
	}
}

func (msg *MsgBuyname) Route() string {
	return RouterKey
}

func (msg *MsgBuyname) Type() string {
	return TypeMsgBuyname
}

func (msg *MsgBuyname) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgBuyname) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgBuyname) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
